import { User, UserProps } from '../user';
import { Username } from '../username';

describe('User', () => {
  let props: UserProps;

  describe('create', () => {
    beforeEach(() => {
      props = {
        username: Username.create({ value: 'username' }).getData(),
      };
    });

    it('should pass for a valid user', () => {
      const result = User.create(props);

      expect(result.success).toBeTruthy();

      const user = result.getData();

      expect(user.id).toBeDefined();
      expect(user.username).toEqual(props.username);
    });

    it('should fail if username is null', () => {
      props = {
        ...props,
        username: null as unknown as Username,
      };

      const result = User.create(props);

      expect(result.success).toBeFalsy();
    });

    it('should fail if username is undefined', () => {
      props = {
        ...props,
        username: undefined as unknown as Username,
      };

      const result = User.create(props);

      expect(result.success).toBeFalsy();
    });
  });
});
