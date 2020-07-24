# 王昱旸 | Part 3 | 模块一

## 简答题

### 第一题

#### 题目

1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如果把新增成员设置成响应式数据，它的内部原理是什么。

``` javascript
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```

#### 解答

响应式数组是指在vue初始化时期，利用Object.defineProperty()方法对其进行监听，这样在修改数据时会及时体现在页面上。但是由于Object.defineProperty()语法的限制，在监听引用数据时，只能监听字段值的变化不能监听字段的新增，所以当我们点击按钮的时候动态给 data 增加的成员不是响应式数据。

设置该值为响应数据的方式有两种：

- 在vue初始化时预先给该字段一个默认值
- 通过vue内置的$set方法进行添加

### 第二题

#### 题目

2、请简述 Diff 算法的执行过程

#### 解答

vue的Diff算法是基于源码中的patch函数，该函数的作用是通过接收新旧两个Vnode的数据进行对比，判断是否为相同的vnode若相同则进行更新，若不同则替换。

在vnode相同更新的过程中函数做了以下的事情

- 找到oldVnode对应的dom
- 对比oldVnode中的内容和newVnode中的内容
- 若都是文本节点且不相等则直接更新
- 若分别为子节点和文本节点则先删除原始的节点然后再插入新的节点
- 若都为子节点则继续对子节点进行比对

子节点的对比有以下几个过程

- 先进行oldStartVnode（oldVnode的第一个子节点）和newStartVnode（newVnode的第一个子节点）的对比，如果为相同的节点则调用上述的更新逻辑，并继续比对下一个节点；若不是相同节点则执行下面的步骤
- 进行oldEndVnode（oldVnode的最后一个子节点）和newEndVnode（newVnode的最后一个子节点）的对比，如果为相同的节点则调用上述的更新逻辑，并继续比对前一个节点；若不是相同节点则执行下面的步骤
- 进行oldStartVnode（oldVnode的第一个子节点）和newEndVnode（newVnode的最后一个子节点）的对比，如果为相同的节点则调用上述的更新逻辑，并继续比对下一个oldVnode的子节点和上一个newVnode的子节点；若不是相同节点则执行下面的步骤
- 进行oldStartVnode（oldVnode的第一个子节点）和newEndVnode（newVnode的最后一个子节点）的对比，如果为相同的节点则调用上述的更新逻辑，更新完成后将当前节点移动至oldVnode子节点中的第一个，并继续比对下一个oldVnode的子节点和上一个newVnode的子节点；若不是相同节点则执行下面的步骤
- 进行oldEndtVnode（oldVnode的最后一个子节点）和newStartVnode（newVnode的第一个子节点）的对比，如果为相同的节点则调用上述的更新逻辑，更新完成后将当前节点移动至oldVnode子节点中的最后一个，并继续比对上一个oldVnode的子节点和下一个newVnode的子节点
- 上述逻辑执行完后若oldVnode的子节点多余newVnode的子节点则删除多余的部分；若oldVnode的子节点少余newVnode的子节点则插入多余的部分
