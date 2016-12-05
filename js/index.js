
var story, level, pos;

var loaded = JSON.parse(localStorage.getItem('savedStory'));

if (loaded){
  story = loaded.story;
  pos = loaded.pos;
  level = loaded.level;
  render(loaded.todo);
} else {
  story = {};
  story[0] = [];
  level = 0;
  pos = [];
  pos[0] = 0;
}

$(document).on("keyup", function(e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    next();
  }
});


function next() {
  /*if(pos[level-1] == story[level-1].length) {
    $("#moveUp").hide();
  } else {
    $("#moveUp").show();
  }*/
  var text = $("#text").text();
  story[level].push(text);
  render("What happens after " + text + "?");
}

function moveDown() {
  var text = $("#text").text();
  if  (text.trim()) {
    story[level].push(text);
  }
  level ++;

  story[level] = [];
  pos.splice(level, 0, 0); //Insert 0 to pos at index level
  render("Now it's time to describe in more detail how " + story[level-1][pos[level-1]] + ".  What happens first?");
}

function moveUp() {
  console.log(pos[level], story[level.toString()].length);
  pos[level-1]++;
  var text = $("#text").text();
  if  (text.trim()) {
    story[level].push(text);
  }
  render("Now it's time to describe in more detail how " + story[level-1][pos[level-1]] + ".  What happens first?");
}

function render(todo) {
  save();
  $("#todo").text(todo);
  $("#text").text("");
  $("#text").focus();
}

function finish() {
  $("#result").text("");
  console.log(story);
  $("#result").text(story[level].join(". "));
}

function debugVars(index) {
  console.log("Story: " + story, typeof story);
  console.log("Story[" + index + "]: " + story[index.toString()], typeof story);
  console.log("Level: " + level, typeof level);
  console.log("Pos: " + pos, typeof pos);
  console.log("Pos[" + index + "]: " + pos[index.toString()], typeof pos);
}

function save() {
  var saveNum = localStorage.getItem('saveNum');
  
  if(saveNum) {
    saveNum ++;
  } else {
    saveNum = 1;
  }
  var save = {'story': story, 'pos': pos, 'level': level, 'todo': $("#todo").text()};
  localStorage.setItem('savedStory'+saveNum, JSON.stringify(save));
}