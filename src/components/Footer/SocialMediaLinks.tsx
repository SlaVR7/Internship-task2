import { Flex } from 'antd';
import VkIcon from '../icons/VkIcon.tsx';
import InstagramIcon from '../icons/InstagramIcon.tsx';
import FacebookIcon from '../icons/FacebookIcon.tsx';
import { Link } from 'react-router-dom';
import FacebookIconDark from '../icons/FacebookIconDark.tsx';
import InstagramIconDark from '../icons/InstagramIconDark.tsx';
import VkIconDark from '../icons/VkIconDark.tsx';

function SocialMediaLinks() {
  return (
    <Flex align={'center'}>
      <Link className="mr-sm" to={'#'}>
        <VkIcon />
        <VkIconDark />
      </Link>
      <Link className="mr-sm" to={'#'}>
        <InstagramIcon />
        <InstagramIconDark />
      </Link>
      <Link to={'#'}>
        <FacebookIcon />
        <FacebookIconDark />
      </Link>
    </Flex>
  );
}

export default SocialMediaLinks;
