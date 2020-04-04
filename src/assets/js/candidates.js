class Candidates {
  constructor(gun, room) {
    this.gun = gun;
    this.think = gun.get(room);
    this.think.map().on(this.show);
  }

  add(user) {
    this.think.set(user);
  }

  remove(user) {
    this.think.get(user.id).put(null);
    this.think.unset(user);
  }

  update(user) {
    this.think.get(user.id).put(user);
  }

  getAll() {
    console.log("start");
    var all = [];
    this.think.map(function(data, id) {
      all.push(data);
    });
    return all;
  }

  show(thought, id) {
    console.log(thought);
    var htmlCollection = document.getElementsByTagName("li");
    var elements = [...htmlCollection];
    const result = elements.map(element => element.id);

    if (thought != null && result.includes(thought.id) && thought.online) {
      return;
    }

    if (thought !== null && thought.online == true) {
      var ul = document.getElementById("dynamic-list");
      var candidate = document.getElementById("candidate");
      var li = document.createElement("li");
      li.addEventListener("click", function(){console.log(this)});
      li.setAttribute("id", thought.id);
      li.appendChild(document.createTextNode(thought.name));
      ul.appendChild(li);
    } else {
      var elements = document.getElementsByTagName("li");
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.id == id && id != sessionStorage.getItem("pid")) {
          element.parentNode.removeChild(element);
        }
      }
    }
  }

  candidateClicked() {
    console.log("click");
  }
}

class User {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.online = false;
  }
}
