import { useSearchUsersQuery } from '@/api/users';
import { DataRenderer } from '@/components/hoc/data-renderer';
import { popupVariants } from '@/config/animations';
import { motion } from 'framer-motion';

import { UserCardItem } from '@/components/features/user/user-card-item';

export const UserList = () => (
  <motion.div variants={popupVariants.wrapper} initial="hidden" animate="visible">
    <DataRenderer
      className="grid-auto"
      {...useSearchUsersQuery()}
      render={(user) => (
        <motion.div key={user.id} variants={popupVariants.item}>
          <UserCardItem user={user} />
        </motion.div>
      )}
    />
  </motion.div>
);
