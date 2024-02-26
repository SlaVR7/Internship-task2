import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import {
  FacebookIcon,
  FacebookIconDark,
  InstagramIcon,
  InstagramIconDark,
  VkIcon,
  VkIconDark,
} from '../icons';

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
