import { message } from 'antd';
export const Copy = (text, copyMessage) => {
  navigator.clipboard.writeText(text);
  message.success(`${copyMessage}`);
};
