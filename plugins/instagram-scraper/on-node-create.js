const Promise = require("bluebird")
const axios = require(`axios`)
const crypto = require(`crypto`)
const { get } = require(`lodash`)

const grayMatter = require(`gray-matter`)
const _ = require(`lodash`)

// Convert timestamp to ISO 8601.
const toISO8601 = timestamp => new Date(timestamp * 1000).toJSON()

// Convert followers to k format if a thousand or more
// https://stackoverflow.com/a/9461657/497344
const kFormatter = num => num > 999 ? (num/1000).toFixed(0) + 'k' : num


module.exports = async function onCreateNode(
  { node, getNode, loadNodeContent, boundActionCreators },
  pluginOptions
) {
  const { createNode, createParentChildLink } = boundActionCreators

  // We only care about markdown content.
  if (
    node.internal.mediaType !== `text/markdown` &&
    node.internal.mediaType !== `text/x-markdown`
  ) {
    return
  }

  // We only care about markdown from the directory artists
  if (node.relativeDirectory !== `artists`) {
    return
  }

  const content = await loadNodeContent(node)
  let data = grayMatter(content, pluginOptions)

  // Convert date objects to string. Otherwise there's type mismatches
  // during inference as some dates are strings and others date objects.
  if (data.data) {
    data.data = _.mapValues(data.data, v => {
      if (_.isDate(v)) {
        return v.toJSON()
      } else {
        return v
      }
    })
  }

  let username
  // we only care about artists with videos
  if (!data.data.instagram_handle) {
    return
  } else {
    username = data.data.instagram_handle
  }


/*
  graphql: {
    user: {
      edge_followed_by: {
        count: 206938
      },
      edge_owner_to_timeline_media: {
        edges: [
          {
            node: {
              id: '',
              display_url: '',
              is_video: false,
              dimensions: {
                width: 1080,
                height: 1080
              },
            }
          }
        ]
      }
    }
  }
*/

  // limit to one artist's videos for testing rate
  if (data.data.instagram_handle !== 'hairbyadir') {
    //return
  }

  //console.log('instagram_handle: ', username)

  // do we need to return a promise here?
  // in the vimeo onCreateNode function we do not return aynthing, we just call createNode, let's test with the below:
  if (username) {
    return axios.get(`https://www.instagram.com/${username}/?__a=1`)
      .then((res, err) => {
        if (err) {
          console.log('Instagram get error: ', username, err)
        } else {

          const images = res.data.graphql.user.edge_owner_to_timeline_media.edges.map(item => {
            return {
              media: get(item.node, `display_url`), // string
              is_video: get(item.node, `is_video`), // boolean
              dimensions: get(item.node, `dimensions`), // height, width
              media_preview: get(item.node, `media_preview`), // base64
            }
          })

          const contentDigest = crypto
            .createHash(`md5`)
            .update(JSON.stringify(data))
            .digest(`hex`)

          const instagramNode = Object.assign(
              { images },
              {
                id: res.data.logging_page_id,
                username: username,
                followers: kFormatter(res.data.graphql.user.edge_followed_by.count),
                parent: node.id,
                children: [],
                internal: {
                  type: `InstagramPhoto`,
                  //content: content,
                  contentDigest: contentDigest,
                  mediaType: `application/json`
                },
              }
          )

          //console.log('instagramNode: ', instagramNode)

          createNode(instagramNode)
          createParentChildLink({ parent: node, child: instagramNode })

        }
        return true;
    })
  }

/*
  return new Promise((resolve, reject) => {

    return axios.get(`https://www.instagram.com/${username}/?__a=1`).then((res, err) => {

        if (err) {
          console.log('Instagram get error: ', username, err)
        } else {

          res.data.graphql.user.edge_owner_to_timeline_media.edges.map(item => {

            const datum = {
              username: username,
              id: get(item.node, `id`), // string
              media: get(item.node, `display_url`), // string
              is_video: get(item.node, `is_video`), // boolean
              dimensions: get(item.node, `dimensions`), // height, width
              media_preview: get(item.node, `media_preview`), // base64
              followers: kFormatter(res.data.graphql.user.edge_followed_by.count)
            }

            const digest = crypto
                .createHash(`md5`)
                .digest(`hex`)
                //.update(JSON.stringify(datum))

            const node = Object.assign(
                datum,
                {
                  parent: `__SOURCE__`,
                  children: [],
                  internal: {
                    type: `InstagramPhoto`,
                    contentDigest: digest,
                    mediaType: `application/json`
                  },
                }
            )

            createNode(node)
            return true;
          })
        }

    })

  })
  */

}

