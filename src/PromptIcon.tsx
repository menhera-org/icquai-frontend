import SvgIcon from '@mui/material/SvgIcon';
import { createSvgIcon } from '@mui/material';

const PromptIcon = createSvgIcon(
    <SvgIcon>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path strokeWidth={2} fill="none" stroke="currentColor" d="M8,6 L16,12 L8,18"/>
        </svg>
    </SvgIcon>,
    'PromptIcon'
);

export default PromptIcon;
