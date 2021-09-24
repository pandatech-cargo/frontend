import { Modal } from 'antd';

import styles from './style.module.scss';

import cs from 'classnames';

/**
 * @param {string} className classname for the component
 * @param {boolean} loading to show spinner on button
 * @param {function} onCancel function to call when clicking cancel button
 * @param {function} onOk function to call when clicking ok button
 * @param {boolean} open to display the modal
 * @param {string} title the title of the modal
 * @returns Ant Design Async Modal, see documentation https://ant.design/components/modal/
 */
export const PdFormModal = ({ 
  children,
  className, 
  loading,
  onCancel,
  onOk,
  open = false,
  title = "",
  ...props 
}) => (
    <Modal
      title={title}
      visible={open}
      onOk={onOk}
      confirmLoading={loading}
      onCancel={onCancel}
      className={cs(styles.formModal, className)}
      {...props }
    >
    {children}
    </Modal>
);
