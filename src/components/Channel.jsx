import React from 'react';
import cn from 'classnames';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';

const Channel = ({
  name, id, isCurrentChannel, removable, handleChangeChannel
}) => {
  const classnameDefault = cn('w-100 rounded-0 text-start btn', {
    'btn-secondary': isCurrentChannel,
  });
  const classnameRemovable = cn('w-100 rounded-0 text-start text-truncate btn', {
    'btn-secondary': isCurrentChannel,
  });
  const buttonClassnameRemovable = cn('flex-grow-0 dropdown-toggle dropdown-toggle-split btn', {
    'btn-secondary': isCurrentChannel,
  });

  return (
    <li className="nav-item">
      {
        !removable
          ? (
            <Button
              className={classnameDefault}
              onClick={handleChangeChannel}
            >
              <span className="me-2">
                {'#'}
              </span>
              {name}
            </Button>
          )
          : (
            <Dropdown className="d-flex" as={ButtonGroup}>
              <Button
                className={classnameRemovable}
                onClick={handleChangeChannel}
              >
                <span className="me-2">
                  {'#'}
                </span>
                {name}
              </Button>
              <Dropdown.Toggle split className={buttonClassnameRemovable} />
              <Dropdown.Menu title="">
                <Dropdown.Item onClick={handleRemoveChannel}>Удалить</Dropdown.Item>
                <Dropdown.Item onClick={handleRenameChannel}>Переименовать</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
      }
    </li>
  );
};

export default Channel;
