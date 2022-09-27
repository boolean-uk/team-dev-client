import { ClickAwayListener, Paper } from '@mui/material';
export const ChangeRole = ({ user, setIsOpen }) => {
  return (
    <>
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <Paper />
      </ClickAwayListener>
    </>
  );
};
