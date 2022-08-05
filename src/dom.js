window.dom = {
  create: function (string) {
    const container = document.createElement("template"); //任何标签都可以使用
    container.innerHTML = string.trim(); //去掉空格，直接读取标签，因为空格算文本
    return container.content.firstChild;
  },

  //新增弟弟
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  //新增哥哥
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },

  //新增儿子
  append(parent, node) {
    parent.appendChild(node);
  },

  //新增爸爸
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },

  //删除节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  //删除节点并把它的儿子都干掉
  empty(node) {
    //const { childNodes } = node//等价于const child =node.ChildNodes
    const array = [];
    /* for (let i = 0; i < childNodes.length; i++) {
      dom.remove(childNodes[i]);
      array.push(childNodes[i]);
    }
    return array; 这个不能用因为childNodes里面的length不会更新*/
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },

  //修改节点title的名字
  attr(node, name, value) {
    //重载根据参数个数不同实现不同功能
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },

  //新建div里面写文本
  text(node, string) {
    //这种写法就叫适配和重载
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },

  //改HTML
  html(node, string) {
    if (argument.length === 2) {
      node.innerHTML = string;
    } else if (argument.length === 1) {
      return node.innerHTML;
    }
  },

  //增加样式style
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        return node.style[name];
      } else if (name instanceof Object) {
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },

  //dom上添加class
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    contains(node, className) {
      return node.classList.contains(className);
    },
  },

  //添加监听事件
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },

  //取消监听事件
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },

  //选择元素
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },

  //找元素的爸爸
  parent(node) {
    return node.parentNode;
  },

  //找儿子
  children(node) {
    return node.children;
  },

  //找兄弟姐妹
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },

  //找到弟弟
  next(node) {
    return node.nextElementSibling;
    /* 等价于 let x = node.nextSibling
    while(x&&x.nodeType===3){
        x=x.nextSibling
    } 
    return x    */
  },
  //找到哥哥
  previous(node) {
    return node.previousElementSibling;
  },

  //遍历所有节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },

  //获取排行第几
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
