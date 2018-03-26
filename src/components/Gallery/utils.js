export function round(value, decimals) {
  if (!decimals) decimals = 0;
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// return two decimal places rounded number
export function ratio({ width, height }) {
  return round(width / height, 2);
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

    const overflow = []

    rows = rows.map((sourceRow, rowIndex) => {

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

      if (points > columns) {

        let spliceAtIndex
        let extra

        if (row.length > columns) {

          //extra = points - columns
          //spliceAtIndex = row.length - extra

          let counter = 0
          spliceAtIndex = columnPointsArray.findIndex(val => {
            counter = counter + val
            //console.log(`Counter: ${counter}`)
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
        //array.splice(row.length - (1 + extra), extra)
      }

      // is it possible to add on to an array while iterating through it?
      if (rows.length - 1 === rowIndex) {
        console.log('END')
        //console.log('WE GOT TO KEEP GOING!', rows, overflow)
        //rows.push(overflow)
      }

      return row

    })

    if (overflow) {
      rows.push(overflow)
      // we somehow need to repeat the process with these ones
    }

  }


  //console.log('balancedRows: ', rows)

  // calculate total ratio of each row, and adjust each cell height and width
  // accordingly.
  const lastRowIndex = rows.length - 1;
  const rowsWithSizes = rows.map((row, rowIndex) => {
    const totalRatio = row.reduce((result, photo) => result + ratio(photo), 0); // adds the ratios of each photo to a total ratio
    const rowWidth = width - row.length * (margin * 2); // minus the margins

    //console.log('totalRatio:', totalRatio, ' rowWidth: ', rowWidth)
    // assign height, but let height of a single photo in the last
    // row not expand across columns so divide by columns
    /*
    const height = (rowIndex !== lastRowIndex || row.length > 2) // eslint-disable-line
        ? rowWidth / totalRatio
        : rowWidth / row.length / totalRatio;
    */

    let height
    if (balanced) {



    } else {
    }
    height = (rowIndex !== lastRowIndex || row.length > 1) // eslint-disable-line
      ? rowWidth / totalRatio
      : rowWidth / columns / totalRatio;

    // row.length was columns, that would give you exactly the original ratio if there were X more images of the same ratio. Here we say there are

    // if not the last row or the row is longer then 1.
    // let's try setting that two 2, using display inline-block
    // and setting the text align to center.

    return row.map(photo => ({
      ...photo,
      height: round(height, 1),
      width: round(height * ratio(photo), 1),
    }));
  });
  //debugger;
  //console.log('rowsWithSizes: ', rowsWithSizes)
  return rowsWithSizes.reduce((acc, row) => [...acc, ...row], []);
}
