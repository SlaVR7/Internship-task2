import {Flex} from 'antd';
import VkIcon from './icons/VkIcon.tsx';
import InstagramIcon from './icons/InstagramIcon.tsx';
import FacebookIcon from './icons/FacebookIcon.tsx';
import { Link } from 'react-router-dom';

function SocialMediaLinks() {
  return (
    <Flex align={'center'} className='mb-4'>
      <Link target='_blank' className='mr-sm' to={''}>
        <VkIcon />
        {/*<VkIconDark />*/}
      </Link>
      <Link target='_blank' className='mr-sm' to={''}>
        <InstagramIcon />
        {/*<InstagramIconDark />*/}
      </Link>
      <Link className='' to={''}>
        <FacebookIcon />
        {/*<FacebookIconDark />*/}
      </Link>
    </Flex>
  );
}

export default SocialMediaLinks;
