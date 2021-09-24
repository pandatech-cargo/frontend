import { Button as AntdButton } from 'antd';

/** using module, ensure we always use unique name */
import styles from './style.module.scss';

import cs from 'classnames';

/**
 *
 * @returns Ant Design Button, see documentation https://ant.design/components/button/#header
 */

export const PdButton = ({ className, ...props }) => (
  <AntdButton
    /** merge the classname */
    className={cs(styles.button, className)}
    /** pass rest of the props to the component, in other word extends the AntdButton component */
    {...props}
  />
);
