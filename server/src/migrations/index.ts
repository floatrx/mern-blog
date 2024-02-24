import bcrypt from 'bcryptjs';
import { Role } from '@/models/role';
import { USER_ROLES } from '@/config';
import { User } from '@/models/user';

(async () => {
  console.log('📦 Create initial data');

  // Create roles if they don't exist
  console.log('📦 Check roles');
  const { ADMIN, USER } = USER_ROLES;
  const rolesToCreate = [
    { id: ADMIN, name: 'admin' },
    { id: USER, name: 'user' },
  ];
  for (const { id: idRole, name } of rolesToCreate) {
    const role = await Role.findOne({ idRole });
    if (role) continue; // Skip if role exists
    await Role.create({ idRole, name });
  }

  // Create users if they don't exist
  const usersCount = await User.countDocuments();

  console.log('📦 Check if users exist');
  if (usersCount) return;
  console.log('📦 Create initial users');

  const password = await bcrypt.hash('123', 10); // Hashed password
  const usersToCreate = [
    { idRole: ADMIN, name: 'Admin', email: 'admin@test.com', password },
    { idRole: USER, name: 'John Doe', email: 'jd@test.com', password },
  ];

  try {
    await User.create(usersToCreate);
  } catch (e) {
    console.error('📦 Error creating initial users:', e.message);
  }
})();
