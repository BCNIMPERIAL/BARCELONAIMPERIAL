// JS placeholder
export default function Home() {
  return (
    <div>
      <h1>欢迎来到 Barcelona Imperial</h1>
      <p>这是我们网站的首页内容。</p>
    </div>
  );
}

function showProduct(id) {
  const sections = document.querySelectorAll('.product-item');
  sections.forEach(section => section.style.display = 'none');

  document.getElementById(`product-${id}`).style.display = 'block';
}

import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // 可放入样式或 inline style 也可以

export default function Home() {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isDragging, setIsDragging] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const startXRef = useRef(0);

  // 触摸展开逻辑（移动端）
  useEffect(() => {
    const touchZone = document.getElementById('touch-zone');
    if (!touchZone) return;

    const handleTouchStart = (e) => {
      startXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      const deltaX = e.touches[0].clientX - startXRef.current;
      if (deltaX > 30) {
        setSidebarOpen(true);
      }
    };

    touchZone.addEventListener('touchstart', handleTouchStart);
    touchZone.addEventListener('touchmove', handleTouchMove);

    return () => {
      touchZone.removeEventListener('touchstart', handleTouchStart);
      touchZone.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // 拖动 sidebar 改变宽度
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setSidebarWidth(Math.max(100, e.clientX));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div style={{ display: 'flex' }}>
      {/* 滑动触发区域（移动端） */}
      <div id="touch-zone" style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '20px', zIndex: 10 }}></div>

      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? sidebarWidth : 0,
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          backgroundColor: '#f1f1f1',
        }}
      >
        <div style={{ padding: '1rem' }}>
          <h3>产品分类</h3>
          <ul>
            <li>床垫</li>
            <li>ZEN</li>
            <li>IMPERIAL</li>
            {/* 你可以放更多产品 */}
          </ul>
        </div>
        {/* 拖拽条 */}
        <div
          onMouseDown={handleMouseDown}
          style={{
            width: '5px',
            cursor: 'col-resize',
            backgroundColor: '#ccc',
            height: '100%',
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        />
      </div>

      {/* 页面主内容 */}
      <div style={{ flex: 1, padding: '1rem' }}>
        <h1>欢迎来到 Barcelona Imperial</h1>
        <p>这是我们网站的首页内容。</p>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '收起 Sidebar' : '展开 Sidebar'}
        </button>
      </div>
    </div>
  );
}
