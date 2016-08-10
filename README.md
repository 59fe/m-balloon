# Balloon

---

简单的文字提示气泡框。

## 何时使用


可用来代替系统默认的 `title` 提示，提供一个`按钮/文字/操作`的文案解释。

```html
<Balloon content="我是内容~~">点我~</Balloon>
```

## API

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
| placement | 气泡框位置，可选 `top`,`left` ,`right`,`bottom`,`topLeft` ,`topRight`,`bottomLeft`, `bottomRight`,`leftTop`, `leftBottom`, `rightTop`, `rightBottom` |string|'bottomLeft'|
| visible     | 气泡内的关闭按钮是否可见    |  boolean | false     |
| onVisibleChange     | 气泡内的关闭按钮可见属性值发生改变后的回调                              | function |     |
| content     | 提示信息                           | string/node | 无     |
