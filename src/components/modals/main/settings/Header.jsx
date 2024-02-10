import variables from 'modules/variables';
import { useState, useEffect } from 'react';
import {
  MdFlag,
  MdOutlineVisibilityOff,
  MdOutlineVisibility,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import EventBus from 'modules/helpers/eventbus';

const Header = (props) => {
  const [setting, setSetting] = useState(localStorage.getItem(props.setting) === 'true');

  useEffect(() => {
    setSetting(localStorage.getItem(props.setting) === 'true');
  }, [props.setting]);

  const changeSetting = () => {
    const toggle = localStorage.getItem(props.setting) === 'true';
    localStorage.setItem(props.setting, !toggle);
    setSetting(!toggle);

    variables.stats.postEvent(
      'setting',
      `${props.name} ${setting === true ? 'enabled' : 'disabled'}`,
    );

    EventBus.emit('toggle', props.setting);

    if (props.element) {
      if (!document.querySelector(props.element)) {
        document.querySelector('.reminder-info').style.display = 'flex';
        return localStorage.setItem('showReminder', true);
      }
    }

    EventBus.emit('refresh', props.category);
  };

  const VisibilityToggle = () => (
    <button className="sideload" onClick={changeSetting}>
      {setting ? (
        <>
          Hide
          <MdOutlineVisibilityOff />
        </>
      ) : (
        <>
          Show
          <MdOutlineVisibility />
        </>
      )}
    </button>
  );

  const ReportButton = () => {
    return (
      <button
        className="sideload"
        onClick={() =>
          window.open(variables.constants.BUG_REPORT + props.title.split(' ').join('+'), '_blank')
        }
      >
        {variables.getMessage('modals.main.settings.sections.header.report_issue')} <MdFlag />
      </button>
    );
  };

  return (
    <>
      <div className="modalHeader">
        <span className="mainTitle">
          {props.secondaryTitle ? (
            <>
              <span className="backTitle" onClick={props.goBack}>
                {props.title}
              </span>
              <MdOutlineKeyboardArrowRight />
              {props.secondaryTitle}
            </>
          ) : (
            <>{props.title}</>
          )}
        </span>
        <div className="headerActions">
          {props.switch && <VisibilityToggle />}
          {props.report !== false && <ReportButton />}
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Header;
