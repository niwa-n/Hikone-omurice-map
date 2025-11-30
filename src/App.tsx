import './App.css'
import './comp/test.css'
import './comp/position.css'

import OmeletteViewer from './comp/map';
import Appbar from './comp/appbar';
import ComingSoon from './comp/confuse';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-container">

    <Appbar />  
    
      {/* ▼ レイヤー1: 背景アニメーション (奥) */}
      <div className="background-layer">
        {/* ここにCSSアニメーション用の要素を書く */}
        <div className="sample">
          {/* 追加する要素 */}
          <div className="circle-animation-1"></div>
          <div className="circle-animation-2"></div>
          <div className="circle-animation-3"></div>
        </div>
      </div>

      {/* ▼ レイヤー2: メインコンテンツ (手前) */}
      <div className="content-layer">
        <Routes>
          {/* メインビュー */}
          <Route path="/" element={<OmeletteViewer />} />

          {/* データ未整備ページ */}
          <Route path="/nodata" element={<ComingSoon />} />

          {/* 必要に応じて他ページも追加 */}
        </Routes>
      </div>

    </div>
  )
}

export default App
