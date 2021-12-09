
processTable();

setInterval(onChange, 10);

document.getElementById("input:btnEnter").addEventListener("click", submit);
document.getElementById("input:r_text").addEventListener("change", repaintArea);
jsf.ajax.addOnEvent(onEvent)

// document.getElementById('input:btnSubmit').onclick = function (e) {
//   let Y = document.getElementById('input:y_text').value;
//   // Y=Y.replace(",",".")
//   let R = document.getElementById("input:r_text").value;
//   let X = document.getElementById("input:x_text").value;
//   // alert(Y,R,X)
//
//
//
//   if (checkY(Y)) {
//       if (checkR(R)) {
//           if (checkX()) {
//               function getCoordinates(){
//                   val_x = convert(X,R)
//                   val_y = convert((-Y),R)
//                   let dot = document.getElementById("dot")
//                   dot.setAttribute("cx", val_x)
//                   dot.setAttribute("cy", val_y)
//               }
//               getCoordinates()
//               setVisible()
//               // $.ajax({
//               //     type: "POST",
//               //     url: "ControllerServlet",
//               //     data: "x=" + X + "&y=" + Y + "&r=" + R,
//               //     success:function (data){
//               //
//               //             document.getElementById("Answer").innerHTML = data
//               //         // document.location.reload()
//               //         // response => response.text()
//               //         // response => document.getElementById("Answer").innerHTML = response
//               //
//               //     }})
//           }
//       }
//   }
//
// }
// document.getElementById('input:reset').onclick = function (e) {
//   e.preventDefault();
//   $.ajax({
//       type: "DELETE",
//       url:"ControllerServlet",
//       success:
//       document.location.reload()
//   })
// }
document.getElementById("coord").addEventListener("click", click);

function onEvent(e){
    // alert(e.type)
    if(e.status.toString()==="success"){
        processTable()
    }
}

function processTable(){
    Array.from(document.querySelectorAll("#result_table tr")).forEach(tr => processRow(tr))
}

function processRow(tr){
    if (tr!=null&&tr.className!=null&&tr.className.length>0){
        let x = Number(tr.children.item(0).innerText)
        let y = Number(tr.children.item(1).innerText)
        let r = Number(tr.children.item(2).innerText)
        let res = tr.children.item(3).innerText

        // alert(`${x} ${y} ${r} ${res}`)

        drawPoint(convert(x,r),convert(-y,r),res.toString()==="true"?"green":"red")
    }

}


function click(e){
  let svg = document.getElementById("svg")
  let svg_r = svg.getBoundingClientRect()
  //alert(e.clientX+ " "+ e.clientY)
  let x = e.clientX-svg_r.left
  let y = e.clientY-svg_r.top
  let r = document.getElementById("input:r_text").value;
  let val_x = ((x-200)/160)*r
  let val_y = ((200-y)/160)*r
  if (checkX(val_x)){
      if (checkR(r)){
          if (checkY(val_y)){
              // $.ajax({
              //     type: "POST",
              //     url: "ControllerServlet",
              //     data: "x=" + val_x + "&y=" + val_y + "&r=" + r,
              //     success:function (data){
              //
              //         document.getElementById("Answer").innerHTML = data
              //         // document.location.reload()
              //         // response => response.text()
              //         // response => document.getElementById("Answer").innerHTML = response
              //
              //     }})

              ajax(val_x, val_y, r);
          }
      }
  }
  // checkInterval(val_x,val_y,r)
  // setVisible()
  // let dot_click = document.getElementById("dot_click")
  // console.log(x.y)
    // dot_click.setAttribute("cx", x)
    // dot_click.setAttribute("cy", y)
}

function drawPoint(x, y, color) {
    let dot = `<circle class="point" cx="${x}" cy="${y}" fill="${color!=null?color:"gray"}" r="5" stroke="white"/>`
    document.getElementById("svg").insertAdjacentHTML("beforeend",dot)
    // dot.setAttribute("cx", x);
    // dot.setAttribute("cy", y);


    // setVisible();
}

function movePoint(x, y) {
    if (isFinite(x) && isFinite(y)) {
        let dot = document.getElementById("dot");
        dot.setAttribute("cx", x);
        dot.setAttribute("cy", y);
    }
    // setVisible();
}

function onChange(e) {
    let xVal = getX();
    let yVal = getY();
    let rVal = getR();

    movePoint(convert(xVal, rVal), convert(-yVal, rVal));
}

function repaintArea() {
    $('.point').remove();
    Array.from(document.querySelectorAll("#result_table tbody tr"))
        .forEach(tr => {
            if (tr != null && tr.className != null && tr.className.length > 0) {
                let xVal = Number(tr.children.item(0).innerText);
                let yVal = Number(tr.children.item(1).innerText);

                let rVal = document.getElementById("input:r_text").value.replace(",", ".");

                let result = checkInterval(xVal, yVal, rVal);

                drawPoint(convert(xVal, rVal), convert(-yVal, rVal), result.toString() === "true" ? "green" : "red");
            }
        })
}

function submit(e) {
    e.preventDefault();
    let Y = document.getElementById('input:y_text').value.replace(",", ".");
    Y=Y.replace(",",".")
    let R = document.getElementById("input:r_text").value.replace(",", ".");
    let X = document.getElementById("input:x_text").value.replace(",", ".");
  // alert(Y,R,X)

  if (checkY(Y)) {
      if (checkR(R)) {
          if (checkX()) {
              function getCoordinates(){
                  val_x = convert(X,R)
                  val_y = convert((-Y),R)
                  let dot = document.getElementById("dot")
                  dot.setAttribute("cx", val_x)
                  dot.setAttribute("cy", val_y)
              }
              getCoordinates();
              // setHiden();
              // setVisible();

              document.getElementById("input:btnSubmit").click();

              // $.ajax({
              //     type: "POST",
              //     url: "ControllerServlet",
              //     data: "x=" + X + "&y=" + Y + "&r=" + R,
              //     success:function (data){
              //
              //             document.getElementById("Answer").innerHTML = data
              //         // document.location.reload()
              //         // response => response.text()
              //         // response => document.getElementById("Answer").innerHTML = response
              //
              //     }})
          }
      }
  }
}

function checkInterval(x,y,r){
    // let dot = document.getElementById("dot_click")
    return y >= 0 && x >= 0 && y <= (r / 2 - x / 2) || y >= 0 && x <= 0 && x >= -r / 2 && y <= r || x <= 0 && y <= 0 && x * x + y * y <= r * r;
    /*
    if (y>=0){
        if(x>=0){
            if(y<=(r/2-x/2)){
                // dot.setAttribute("fill","blue")
                return true;
            }
            else {
                // dot.setAttribute("fill","red")
                return false;
            }


        }
        else if (x >= 0){
            if(x>=-r/2 && y<=r){
                // dot.setAttribute("fill","blue")
                return true;
            }
            else{
                // dot.setAttribute("fill","red")
                return false;
            }

        }
    }else{
        if(x>0){
            //nothing
            // dot.setAttribute("fill","red")
            return false;
        }
        else{
            if (x*x+y*y<=r*r){
                // dot.setAttribute("fill","blue")
                return true;
            }
            else{
                // dot.setAttribute("fill","red")
                return false;
            }

        }

    }*/

}
// function setVisible(){
//   let dot = document.querySelector("#dot_click")
//   dot.setAttribute("visibility","visible")
// }
// function setHiden(){
//   let dot = document.querySelector("#dot")
//   dot.setAttribute("visibility","hidden")
// }

function getX() {
    return document.getElementById("input:x_text").value.trim().replace(',', '.');
}

function getY() {
    return document.getElementById("input:y_text").value.trim().replace(',', '.');
}

function getR() {
    return document.getElementById("input:r_text").value.trim().replace(',', '.');
}

function ajax(x, y, r) {
    let oldX = getX();
    let oldY = getY();
    let oldR = getR();

    document.getElementById("input:x_text").value = x;
    document.getElementById("input:y_text").value = y;
    document.getElementById("input:r_text").value = r;

    document.getElementById("input:btnSubmit").click();

    document.getElementById("input:x_text").value = oldX;
    document.getElementById("input:y_text").value = oldY;
    document.getElementById("input:r_text").value = oldR;
}

function convert(val,R){
  return 200+((val)/R)*160
}

function checkY(Y) {

  if (Y == null || Y.length == 0) {
      alert("write something in the field Y!");
      return false
  }
  else if (parseFloat(Y) < -3) {
      alert("Y cant be less then -3");
      return false
  }
  else if (parseFloat(Y) > 5) {
      alert("Y cant be higher then 5");
      return false
  }
  else if (isNaN(Y)) {
      alert("Y must be a number");
      return false;
  }
  else {
      return true
  }
}

function checkR(R) {
    return true
  // if (R == null || R.length == 0) {
  //     alert("write something in the field R!");
  //     return false
  // }
  // else if (parseFloat(R) < 1) {
  //     alert("R cant be less then 1");
  //     return false
  // }
  // else if (parseFloat(R) > 4) {
  //     alert("R cant be higher then 4");
  //     return false
  // }
  // else if (isNaN(R)) {
  //     alert("R must be a number");
  //     return false;
  // }
  // else {
  //     return true
  // }
}

function checkX(X) {
  // try {

      if (X > 5) {
          alert("X cant be higher then 5")
          return false;
      } else if(X<-5){
          alert("X cant be higher then 5")
          return false;
      }
      else{
          return true;
      }

  // }
  // catch (err) {
  //     alert("you need to choose something in X value")
  //     return false
  // }
}
