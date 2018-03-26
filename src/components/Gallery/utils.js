export function round(value, decimals) {
  if (!decimals) decimals = 0;
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// return two decimal places rounded number
export function ratio({ width, height }) {
  return round(width / height, 2);
}


function balancer(rows, columns) {

  const overflow = []

  let grid = rows.map((sourceRow, rowIndex) => {

    console.log(`Row ${rowIndex} ===============================`)

    let row
    if (overflow && overflow.length > 0) {
      row = overflow.concat(sourceRow)
      while(overflow.length > 0) { overflow.pop() }
    } else {
      row = sourceRow
    }

    const columnPointsArray = row.map(column => {
      return column.width > 1 ? 2 : 1
    })

    const points = columnPointsArray.reduce((a, b) => a + b, 0)
    console.log(`Length: ${row.length}, Points: ${columnPointsArray}, Total: ${points}`)

    if (points > (columns + 1)) {

      let spliceAtIndex
      let extra

      if (row.length > columns) {

        let counter = 0
        spliceAtIndex = columnPointsArray.findIndex(val => {
          counter = counter + val
          return counter >= columns
        }) + 1

        extra = row.length - spliceAtIndex

        console.log('!!! spliceAtIndex: ', spliceAtIndex)
        console.log(`!!! extra ${extra}`)

      } else {
        extra = 1
        spliceAtIndex = row.length - 1
      }

      console.log(`${points} is more then ${columns} by ${extra}. Cut at index ${spliceAtIndex}`)

      const removed = row.splice(spliceAtIndex, extra)

      removed.length > 0 && removed.forEach(item => overflow.push(item) )

      console.log('remainingRow: ', row)
      console.log('and overflow: ', overflow)
    }

    return row

  })



  // we somehow need to repeat the process with these ones
  if (overflow) {

    const overflowRow = overflow.reduce((acc, cell, idx) => {
      const row = Math.floor(idx / columns);
      acc[row] = acc[row] ? [...acc[row], cell] : [cell]; // eslint-disable-line no-param-reassign
      return acc;
    }, []);

    if (overflowRow.length > 0) {
      console.log('STILL MORE TO GO!', overflowRow)
      grid = grid.concat(balancer(overflowRow, columns))
    }
  }

  return grid

}


// takes the Gallery's photos prop object, width of the container,
// margin between photos Gallery prop, and columns Gallery prop.
// calculates, sizes based on columns and returns the photos object with new height/width props
export function computeSizes({ photos, columns, width, margin, balanced }) {
  if (!width) {
    return [];
  }
  // divide photos over rows, max cells based on `columns`
  // effectively resulting in [[0, 1, 2], [3, 4, 5], [6, 7]]
  let rows = photos.reduce((acc, cell, idx) => {
    const row = Math.floor(idx / columns);
    acc[row] = acc[row] ? [...acc[row], cell] : [cell]; // eslint-disable-line no-param-reassign
    return acc;
  }, []);



  const skip = true

  if (balanced && skip) {

    rows = balancer(rows, columns)

  }


  //console.log('balancedRows: ', rows)

  // calculate total ratio of each row, and adjust each cell height and width
  // accordingly.
  const lastRowIndex = rows.length - 1;
  const rowsWithSizes = rows.map((row, rowIndex) => {
    const totalRatio = row.reduce((result, photo) => result + ratio(photo), 0); // adds the ratios of each photo to a total ratio
    const rowWidth = width - row.length * (margin * 2); // minus the margins

    // assign height, but let height of a single photo in the last
    // row not expand across columns so divide by columns
    /*
    const height = (rowIndex !== lastRowIndex || row.length > 2) // eslint-disable-line
        ? rowWidth / totalRatio
        : rowWidth / row.length / totalRatio;
    */

    let height
    if (balanced) {

      if (rowIndex !== lastRowIndex) {
        height = rowWidth / totalRatio
      } else {

        const columnPointsArray = row.map(column => {
          return column.width > 1 ? 2 : 1
        })
        const points = columnPointsArray.reduce((a, b) => a + b, 0)

        console.log('LAST: totalRatio:', totalRatio, ' rowWidth: ', rowWidth)

        // width = 2143
        // totalRatio = 3.59
        console.log('LAST: ', row, ' points: ', columnPointsArray,' total: ', points)


        if (row.length === 1) {
          // just one image, treat it as if there were in a full row of similar sized images

          if (points > 1) {
            // if we have a single landscape image, make it bigger
            height = rowWidth / columns
          } else {
            height = rowWidth / columns / totalRatio
          }


        } else if (points === row.length) {

          // if each column is worth 1 it will equal the length of the row
          // then we know to make them act like a single image

          height = rowWidth / columns

        } else {


          // if the columns points vary, divide by the points
          height = rowWidth / totalRatio
          // This mostly works great except for 5 columns that add up to 2 images that add up to 3 points
          // in that case this is better:
          // height = rowWidth / columns
          // but how to detect that situtation automatically?
          console.log('LAST: points', height)

        }


      }


    } else {
      height = (rowIndex !== lastRowIndex || row.length > 1) // eslint-disable-line
        ? rowWidth / totalRatio
        : rowWidth / columns / totalRatio;
    }

    // row.length was columns, that would give you exactly the original ratio if there were X more images of the same ratio. Here we say there are

    // if not the last row or the row is longer then 1.
    // let's try setting that two 2, using display inline-block
    // and setting the text align to center.

    return row.map(photo => {
      if (rowIndex === lastRowIndex) {
        console.log('LAST: height / width', round(height, 1), round(height * ratio(photo), 1))
      }
      return ({
        ...photo,
        height: round(height, 1),
        width: round(height * ratio(photo), 1),
      })
    });
  });
  //debugger;
  //console.log('rowsWithSizes: ', rowsWithSizes)
  return rowsWithSizes.reduce((acc, row) => [...acc, ...row], []);
}
