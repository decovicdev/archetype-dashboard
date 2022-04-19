import Image from 'next/image';
import Link from 'next/link';

type Props = {
  className?: string;
  variant?: 'dark' | 'light';
};
const ArcheTypeNlogo: React.FC<Props> = ({ variant = 'light', className }) => (
  <Link href="/">
    <a className={`w-full flex justify-center ${className}`}>
      <Image
        className="  object-contain"
        src={variant === 'light' ? '/ArchetypeWhite.png' : '/ArchetypeDark.png'}
        alt="Logo"
        width={200}
        height={95}
      />
    </a>
  </Link>
);

export default ArcheTypeNlogo;
