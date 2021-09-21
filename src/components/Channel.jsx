import React from 'react';
import cn from 'classnames';

const Channel = ({
  name, id, isCurrentChannel, removable,
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

  if (!removable) {
    return (
      <li className="nav-item w-100">
        <button type="button" className={classnameDefault}>
          <span className="me-1">#</span>
          {name}
        </button>
      </li>
    );
  }
  return (
    <li className="nav-item w-100">
      <div role="group" className="d-flex dropdown btn-group">
        <button type="button" className={classnameRemovable}>
          <span className="me-1">#</span>
          1234
        </button>
        <button aria-haspopup="true" aria-label="send" aria-expanded="false" type="button" className={buttonClassnameRemovable} />
        <div
          x-placement="bottom-start"
          aria-labelledby=""
          className="dropdown-menu"
          style={{
            position: 'absolute', top: `${0}px`, left: `${0}px`, margin: `${0}px`, opacity: 0, pointerEvents: 'none',
          }}
          wfd-invisible="true"
        >
          <a href="#" className="dropdown-item" role="button">Удалить</a>
          <a href="#" className="dropdown-item" role="button">Переименовать</a>
        </div>
      </div>
    </li>
  );
};

export default Channel;
