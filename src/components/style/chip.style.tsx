import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
export const useChipStyle = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      background: '#212121',
      color: '#FFFFFF',
      position: 'relative',
      height: '24px',
      '& .MuiChip-deleteIcon': {
        position: 'absolute',
        right: '-24px',
        top: '-10px',
      },
      '& .MuiChip-label': {
        padding: '4px 12px',
      },
    },
  });
});
