const Promise = require(`bluebird`)
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require(`graphql`)

//var RateLimiter = require('limiter').RateLimiter;
//var limiter = new RateLimiter(1, 1000);

const Vimeo = require(`vimeo`).Vimeo
// var client = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);
const client = new Vimeo('0bae336f64db523e5f207cadfa9cb7f2f422e75d', 'KtIu+uLHWvBMf1w+NrUqgVtG/t1IA65NIL0nUCtv1MhDW61dda0d84ogyynuBQchtzYxiT8hKUSxvhh5tYAgqJwz+m1obFi9qVSIRs7IK8u4fkCb4xNSDjhSUPJO9Pkg', '2be7787cf8427b099b37ddd485e056fd')

const astCacheKey = node =>
  `transformer-vimeo-markdown-ast-${
    node.internal.contentDigest
  }`

module.exports = (
  { type, store, pathPrefix, getNode, cache },
  pluginOptions
) => {
  if (type.name !== `VimeoThumbnail`) {
    return {}
  }

  async function getAST(vimeoNode) {

    const cachedAST = await cache.get(astCacheKey(vimeoNode))
    //const cachedAST = false;
    if (cachedAST) {
      return cachedAST
    } else {

      const ast = new Promise((resolve, reject) => {

        const videos = vimeoNode.videos ? vimeoNode.videos.map(video => {
          return new Promise(resolve => {

//
            //// limiter.removeTokens(1, function() {});
            // apparently the vimeo api doesn't really care how fast
            // you make requets, just how many in a 15 minute window

            client.request({
              path: `/videos/${video.url}`,
              query: { fields: `name, pictures` }
            }, function (error, body, status_code, headers) {
              if (error) {
                console.log('Vimeo error: ')
                console.log(error)
                console.log('Vimeo error headers: ')
                console.log(headers)
                reject()
              } else {
                console.log('Vimeo response headers for:', video.url)
                console.log(headers['x-ratelimit-limit'], ' ', headers['x-ratelimit-remaining'], ' ', headers['x-ratelimit-reset'])
                const { name, pictures } = body
                const { sizes } = pictures
                const biggest = sizes[sizes.length - 1]
                const poster = biggest.link
                const aspectRatio = biggest.width / biggest.height
                const ratio = `${1 / aspectRatio * 100}%`
                resolve({
                  name,
                  poster,
                  ratio,
                  id: video.url
                })
              }
            });
          });
        }) : [{}]

        Promise.all(videos).then((res) => {
          //console.log("PROMISE ALL RES NEW: ", res)
          resolve(res)
        })

      })

      // Save new AST to cache and return
      cache.set(astCacheKey(vimeoNode), ast)
      return ast

    }

  }

  async function getArray(vimeoNode) {
    return getAST(vimeoNode).then(ast => {
      console.log('getAST value: ', ast)
      return ast
    }, reason => {
      console.log('getAST rejection: ', reason)
      return []
    })
  }

  const ListType = new GraphQLObjectType({
    name: `Vimeo`,
    fields: {
      name: {
        type: GraphQLString,
        resolve(vimeo) {
          return vimeo.name
        },
      },
      poster: {
        type: GraphQLString,
        resolve(vimeo) {
          return vimeo.poster
        },
      },
      id: {
        type: GraphQLString,
        resolve(vimeo) {
          return vimeo.id
        },
      },
      ratio: {
        type: GraphQLString,
        resolve(vimeo) {
          return vimeo.ratio
        },
      },
    },
  })


  return new Promise((resolve, reject) => {
    return resolve({
      videos: {
        type: new GraphQLList(ListType),
        resolve(vimeoNode) {
          return getArray(vimeoNode)
          //return getAST(vimeoNode).then(ast => ast)
        },
      }
    })
  })
}