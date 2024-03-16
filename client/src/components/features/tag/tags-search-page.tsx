import { popDownVariants } from '@/config/animations';
import { motion } from 'framer-motion';

import { CreateTag } from '@/components/features/tag/create-tag';
import { TagsManager } from '@/components/features/tag/tag-manager';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';

export const TagsSearchPage = () => (
  <motion.div className="space-y-4" variants={popDownVariants.wrapper} initial="hidden" animate="visible">
    <motion.div variants={popDownVariants.item}>
      <Card>
        <CardHeader>
          <Heading text="Tags" />
        </CardHeader>
        <CardContent>
          <TagsManager />
        </CardContent>
      </Card>
    </motion.div>
    <motion.div variants={popDownVariants.item}>
      <Card>
        <CardHeader>
          <Heading text="Create new" level={3} />
        </CardHeader>
        <CardContent>
          <CreateTag />
        </CardContent>
      </Card>
    </motion.div>
  </motion.div>
);

export default TagsSearchPage;
