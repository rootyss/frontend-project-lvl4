import React from 'react';
import cn from 'classnames';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const renderButtons = ({
  t,
  name,
  isCurrentChannel,
  removable,
  handleChangeChannel,
  handleRemoveChannel,
  handleRenameChannel,
}) => {
  const classnameDefault = cn('w-100 rounded-0 text-start btn text-truncate', {
    'btn-secondary': isCurrentChannel,
  });
  const classnameRemovable = cn('w-100 rounded-0 text-start text-truncate btn', {
    'btn-secondary': isCurrentChannel,
  });
  const buttonClassnameRemovable = cn('flex-grow-0 dropdown-toggle dropdown-toggle-split btn', {
    'btn-secondary': isCurrentChannel,
  });

  if (!removable) {
    return (
      <Button
        role="button"
        className={classnameDefault}
        onClick={handleChangeChannel}
      >
        <span className="me-2">
          #
        </span>
        {name}
      </Button>
    );
  }
  return (
    <Dropdown className="d-flex" as={ButtonGroup}>
      <Button
        role="button"
        className={classnameRemovable}
        onClick={handleChangeChannel}
      >
        <span className="me-2">
          #
        </span>
        {name}
      </Button>
      <Dropdown.Toggle split className={buttonClassnameRemovable} />
      <Dropdown.Menu title="">
        <Dropdown.Item onClick={handleRemoveChannel}>{t('channel.delete')}</Dropdown.Item>
        <Dropdown.Item onClick={handleRenameChannel}>{t('channel.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const ChannelBox = ({
  name,
  isCurrentChannel,
  removable,
  handleChangeChannel,
  handleRemoveChannel,
  handleRenameChannel,
}) => {
  const { t } = useTranslation();
  return (
    <li className="nav-item">
      {renderButtons({
        t,
        name,
        isCurrentChannel,
        removable,
        handleChangeChannel,
        handleRemoveChannel,
        handleRenameChannel,
      })}
    </li>
  );
};

export default ChannelBox;
