import UserListItem from './UserListItem';

const UserList = () => {
  const users = [{ name: 'Hi' }, { name: 'Hi' }, { name: 'Hi' }];
  return (
    <div>
      {users.map(user => (
        <UserListItem {...user} />
      ))}
    </div>
  );
};

export default UserList;
