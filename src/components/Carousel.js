import './style.less';
import { Component } from 'react';
import { render } from 'react-dom';

class Carousel extends Component {
  state = { ptr: 0 };
  timeout = null; //轮播定时器
  static url = 'http://laichuanfeng.com/demo/carousel/';
  static imgs = [
    { id: 1, img: 'carousel_1.jpg', interval: 5 },
    { id: 2, img: 'carousel_2.jpg', interval: 2 },
    { id: 3, img: 'carousel_3.jpg', interval: 3 },
    { id: 4, img: 'carousel_4.jpg', interval: 2 },
    { id: 5, img: 'carousel_5.jpg', interval: 4 },
  ];

  /**
   * 循环输出索引
   * @param startIndex {Number} 开始的索引
   * @param interval {Number} 间隔
   * @param length {Number} 循环长度
   */
  static makeIndex = ({ startIndex, interval, length }) => {
    let index = startIndex;
    return () => {
      index += interval;
      return index % length;
    };
  };

  /**
   * 定时器，切换指针指向
   * @param startIndex {Number} 轮播开始时的元素索引
   */
  cyclePlay = (startIndex, list = []) => {
    const index = Carousel.makeIndex({
      startIndex,
      interval: 1,
      length: Carousel.imgs.length,
    });
    const interval = list[startIndex].interval * 1000;
    this.setState({ ptr: startIndex });

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(
      function timer() {
        const iLen = index()
        this.setState({ ptr: iLen });
        this.timeout = setTimeout(timer.bind(this), list[iLen].interval * 1000);
      }.bind(this),
      interval
    );
  };

  /**
   * 计算当前元素的样式
   * @param index {Number} 元素的索引
   */
  getClassName = (index) => {
    const { ptr } = this.state;
    const length = Carousel.imgs.length;
    return index === ptr
      ? 'center'
      : index === (ptr + length - 1) % length
      ? 'left'
      : 'right';
  };

  getStep(index, len) {
    let left = index - 1;
    let right = index + 1;
    if (left < 0) left = len - 1;
    if (right > len - 1) right = 0;
    return [left, index, right];
  }

  componentDidMount() {
    this.cyclePlay(0, Carousel.imgs);
  }

  render() {
    const { ptr } = this.state;
    const list = this.getStep(ptr, Carousel.imgs.length)
    const stepList = ['left', 'center', 'right'];
    return (
      <div className='content'>
        <ul className='carousel'>
          {list.map((v, index) => (
            <li
              key={Carousel.imgs[v].id}
              className={stepList[index]}
              style={{
                background: `url(${Carousel.url}${
                  Carousel.imgs[v].img
                })`,
              }}
            ></li>
          ))}
        </ul>
      </div>
    );
  }
}

render(<Carousel />, document.getElementById('root'));
