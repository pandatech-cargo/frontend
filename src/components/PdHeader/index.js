import { PageHeader as AntdPageHeader } from 'antd';

/** using module, ensure we always use unique name */
import styles from './style.module.scss';

import cs from 'classnames';

/**
 *
 * @returns Ant Design Page Header, see documentation https://ant.design/components/page-header/#header
 */

export const PdHeader = ({ className, ...props }) => (
  <AntdPageHeader
    /** merge the classname */
    className={cs(styles.header, className)}
    /** pass rest of the props to the component, in other word extends the AntdPageGeader component */
    {...props}
  />
);
