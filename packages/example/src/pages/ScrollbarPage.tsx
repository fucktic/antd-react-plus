import React, { useState } from 'react';
import { Card, Typography, Divider, Input, Switch } from 'antd';
import { Scrollbar } from 'antd-react-plus-ui';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const ScrollbarPage: React.FC = () => {
  const [showVertical, setShowVertical] = useState(true);
  const [showHorizontal, setShowHorizontal] = useState(true);
  const [hoverOnly, setHoverOnly] = useState(false);
  const [scrollbarSize, setScrollbarSize] = useState<number>(8);

  // 生成长文本内容用于演示滚动
  const longText = '这是一段很长的文本内容，用于测试滚动条的垂直滚动功能。'.repeat(50);
  const wideContent = '宽内容 '.repeat(100);

  return (
    <div className="p-6">
      <Title level={2}>自定义滚动条组件</Title>
      <Paragraph>
        Scrollbar组件提供了一个美观、可定制的滚动条，用于替代浏览器默认的滚动条，提升用户体验。
        该组件支持垂直和水平滚动，可以自定义滚动条的大小、颜色，并提供了多种交互方式。
      </Paragraph>
      <Divider />

      {/* 基础演示 */}
      <Card title="基础滚动演示" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 垂直滚动演示 */}
          <div>
            <Title level={5}>垂直滚动</Title>
            <Scrollbar style={{ height: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
              <div style={{ padding: '16px' }}>
                <Typography>
                  {longText.split('').map((char, index) => (
                    <Text key={index}>{char}</Text>
                  ))}
                </Typography>
              </div>
            </Scrollbar>
          </div>

          {/* 水平滚动演示 */}
          <div>
            <Title level={5}>水平滚动</Title>
            <Scrollbar 
              horizontal={true}
              vertical={false}
              style={{ height: '100px', border: '1px solid #d9d9d9', borderRadius: '4px', marginTop: '100px' }}
            >
              <div style={{ padding: '16px', whiteSpace: 'nowrap' }}>
                <Typography>{wideContent}</Typography>
              </div>
            </Scrollbar>
          </div>
        </div>
      </Card>

      {/* 高级配置演示 */}
      <Card title="高级配置" className="mb-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <Text>显示垂直滚动条</Text>
            <Switch checked={showVertical} onChange={setShowVertical} />
          </div>
          <div className="flex items-center justify-between mb-2">
            <Text>显示水平滚动条</Text>
            <Switch checked={showHorizontal} onChange={setShowHorizontal} />
          </div>
          <div className="flex items-center justify-between mb-2">
            <Text>仅悬浮显示</Text>
            <Switch checked={hoverOnly} onChange={setHoverOnly} />
          </div>
          <div className="mb-4">
            <Text>滚动条大小: {scrollbarSize}px</Text>
            <Input
              type="number"
              min={4}
              max={20}
              value={scrollbarSize}
              onChange={(e) => setScrollbarSize(parseInt(e.target.value) || 8)}
              style={{ width: '100px', marginTop: '8px' }}
            />
          </div>
        </div>

        <Scrollbar
          vertical={showVertical}
          horizontal={showHorizontal}
          hoverOnly={hoverOnly}
          scrollbarSize={scrollbarSize}
          style={{ 
            height: '300px', 
            border: '1px solid #d9d9d9', 
            borderRadius: '4px',
            backgroundColor: '#fafafa'
          }}
        >
          <div style={{ padding: '16px', minWidth: '800px' }}>
            <Typography>
              <Title level={5}>自定义配置的滚动区域</Title>
              <Paragraph>
                {longText}
              </Paragraph>
              <Paragraph>
                {wideContent}
              </Paragraph>
            </Typography>
          </div>
        </Scrollbar>
      </Card>

      {/* 表单中的应用 */}
      <Card title="在表单中的应用" className="mb-6">
        <Scrollbar style={{ height: '200px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
          <div style={{ padding: '16px' }}>
            <TextArea
              rows={10}
              placeholder="请输入大量文本内容..."
              defaultValue={longText}
              style={{ border: 'none', boxShadow: 'none', resize: 'none' }}
            />
          </div>
        </Scrollbar>
      </Card>

      <div className="mt-8">
        <Title level={4}>组件特性</Title>
        <ul className="list-disc pl-6 space-y-2">
          <li>可定制的滚动条样式，支持自定义颜色和大小</li>
          <li>支持垂直和水平滚动，可单独控制显示/隐藏</li>
          <li>提供鼠标悬浮时才显示滚动条的选项</li>
          <li>支持通过API滚动到指定位置</li>
          <li>响应式设计，适配不同屏幕尺寸</li>
          <li>支持高对比度模式和减少动画偏好设置</li>
          <li>支持滚动事件监听和回调</li>
        </ul>
      </div>
    </div>
  );
};

export default ScrollbarPage;