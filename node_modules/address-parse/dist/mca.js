'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _area = require('./area.js');

var _area2 = _interopRequireDefault(_area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 民政部行政区划代码页面控制台执行
 * http://www.mca.gov.cn/article/sj/xzqh/2020/20201201.html
 * 先把 area.js 中的 area = {}  复制过去
 * 然后执行下面代码获得更新数据
 */
(function () {
  var list = Array.from(document.querySelectorAll('tr')).map(function (el) {
    return [(el.children[1] ? el.children[1].innerText : '').trim(), (el.children[2] ? el.children[2].innerText : '').trim()];
  }).filter(function (ary) {
    return ary[0] && ary[0] !== '行政区划代码';
  });
  var updateList = [];
  var newList = [];
  /*const delList = [];
  for (const code in area.city_list) {
    if (!list.some(ary => ary[0] === code)) {
      delList.push([code, area.city_list[code]]);
      delete area.city_list[code];
    }
  }
  for (const code in area.area_list) {
    if (!list.some(ary => ary[0] === code)) {
      delList.push([code, area.area_list[code]]);
      delete area.area_list[code];
    }
  }*/
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          code = _step$value[0],
          name = _step$value[1];

      var targetData = code.substr(2) === '0000' ? _area2.default.province_list : code.substr(4) === '00' ? _area2.default.city_list : _area2.default.area_list;
      if (!targetData[code]) {
        newList.push([code, name]);
        targetData[code] = name;
      } else if (targetData[code] !== name && !['北京市', '天津市', '上海市', '重庆市'].includes(name)) {
        updateList.push([code, name, targetData[code]]);
        targetData[code] = name;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  console.log(JSON.stringify(_area2.default));
  console.log('\u66F4\u65B0' + updateList.length + '\u6761', updateList);
  console.log('\u65B0\u589E' + newList.length + '\u6761', newList);
  // console.log(`删除${delList.length}条`, delList);
})();