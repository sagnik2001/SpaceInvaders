var jet = document.getElementById("jet");
var board = document.getElementById("board");
var end=document.getElementById("GameOver");
let score=0;
const music1=new Audio("gamemusic.mp3")
const laser=new Audio("laser.mp3");
const gameend=new Audio("gameover.mp3");
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    highScore.innerHTML = "HiScore: " + hiscore;
}

window.addEventListener("keydown", (event) => {
music1.play();
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (event.keyCode == 37 && left > 0)
    jet.style.left = left - 10 + "px";
  else if (event.keyCode == 39 && left < 460)
    jet.style.left = left + 10 + "px";
  if (event.keyCode == 38 || event.keyCode == 32) {
    laser.play();
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);
    var movebullet = setInterval(() => {
      var rocks = document.getElementsByClassName("rocks");
      for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        if (rock != undefined) {
          var rockbound = rock.getBoundingClientRect();
          var bulletbound = bullet.getBoundingClientRect();
          if (bulletbound.left >= rockbound.left && bulletbound.right <= rockbound.right && bulletbound.top <= rockbound.top && bulletbound.bottom <= rockbound.bottom) {
            rock.parentElement.removeChild(rock);
            score += 1;
            if(score>hiscoreval){
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                highScore.innerHTML = "HiScore: " + hiscoreval;
            }
            points.innerHTML = "Score: " + score;

          }
        }
      }
      var bulletbottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));
      if (bulletbottom >= 500)
        clearInterval(movebullet)
      bullet.style.left = left + "px";
      bullet.style.bottom = bulletbottom + 3 + "px";
    })

  }
})

var generaterocks = setInterval(() => {

  var rock = document.createElement("div");
  rock.classList.add("rocks");
  var rockleft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));
  rock.style.left = Math.floor(Math.random() * 450) + "px";
  board.appendChild(rock);
}, 1000);
var moverocks = setInterval(() => {

  var rocks = document.getElementsByClassName("rocks");

  if (rocks != undefined) {
    for (var i = 0; i < rocks.length; i++) {
      var rock = rocks[i];
      var rocktop = parseInt(window.getComputedStyle(rock).getPropertyValue("top"));
      rock.style.top = rocktop + 25 + "px";
      if (rocktop >= 475) {
          end.style.visibility="visible";
         alert("Reload it to play again")
         gameend.play();
         music1.pause();

        clearInterval(moverocks);
        window.location.reload();
        score=0;

      }
    }
  }
}, 500);
