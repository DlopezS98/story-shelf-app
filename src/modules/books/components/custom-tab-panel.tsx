import { Box } from "@mui/material";

export interface ICustomTabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const CustomTabPanel: React.FC<ICustomTabPanelProps> = (props: ICustomTabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (<Box sx={{ p: 3 }}>{children}</Box>)}
    </div>
  );
};

export default CustomTabPanel;