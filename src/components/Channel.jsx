import React from 'react';
import cn from 'classnames';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const getNormalizedNameChannel = (name) => {
  if (name.length > 15) {
    return `${name.split('').slice(0, 13).join('')}...`;
  }
  return name;
};

const getChannels = ({
  name,
  isCurrentChannel,
  removable,
  handleChangeChannel,
  handleRemoveChannel,
  handleRenameChannel,
}) => {
  const { t } = useTranslation();

  const classnameDefault = cn('w-100 rounded-0 text-start btn', {
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
        className={classnameDefault}
        onClick={handleChangeChannel}
      >
        <span className="me-2">
          #
        </span>
        {getNormalizedNameChannel(name)}
      </Button>
    );
  }
  return (
    <Dropdown className="d-flex" as={ButtonGroup}>
      <Button
        className={classnameRemovable}
        onClick={handleChangeChannel}
      >
        <span className="me-2">
          #
        </span>
        {getNormalizedNameChannel(name)}
      </Button>
      <Dropdown.Toggle split className={buttonClassnameRemovable} />
      <Dropdown.Menu title="">
        <Dropdown.Item onClick={handleRemoveChannel}>{t('channel.delete')}</Dropdown.Item>
        <Dropdown.Item onClick={handleRenameChannel}>{t('channel.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Channel = ({
  name,
  isCurrentChannel,
  removable,
  handleChangeChannel,
  handleRemoveChannel,
  handleRenameChannel,
}) => (
  <li className="nav-item">
    {getChannels({
      name,
      isCurrentChannel,
      removable,
      handleChangeChannel,
      handleRemoveChannel,
      handleRenameChannel,
    })}
  </li>
);

export default Channel;
