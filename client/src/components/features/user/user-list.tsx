import { useSearchUsersQuery } from '@/api/users';
import { DataRenderer } from '@/components/hoc/data-renderer';
import { popDownVariants } from '@/config/animations';
import { motion } from 'framer-motion';

import { UserCardItem } from '@/components/features/user/user-card-item';

export const UserList = () => (
  <motion.div variants={popDownVariants.wrapper} initial="hidden" animate="visible">
    <DataRenderer
      className="grid-auto"
      {...useSearchUsersQuery()}
      render={(user) => (
        <motion.div key={user.id} variants={popDownVariants.item}>
          <UserCardItem user={user} />
        </motion.div>
      )}
    />
  </motion.div>
);
