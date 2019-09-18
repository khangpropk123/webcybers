import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 1000,
    margin: '0 auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#42f584',
  },
  title:{
    fontSize: '30pt'
  }
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardHeader 
        avatar={
          <Avatar sizes="large" aria-label="Cyber Team S" className={classes.avatar}>
            CyberS
          </Avatar>
        }
        action={
          <IconButton  aria-label="Settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Cyber S Team"
        subheader=""
      />
      <CardMedia
        className={classes.media}
        image="https://tradeandinvest.wales/sites/default/files/styles/standard_75_desktop_retina/public/cyber.jpg?itok=Il5DPbc_"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="h2" color="textSecondary" component="p">
          TCyberS Team
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton corlor='primary'  aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton  color ="primary" aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph></Typography>
          <Typography paragraph variant="h5">
       <b> Về định hướng nghề nghiệp:</b>
            Định hướng nghiên cứu để tìm việc
            Định hướng nghiên cứu để phát triển thành StartUp
            Định hướng để làm Bug Bounty Hunter

          </Typography>
          <Typography paragraph variant="h5">
          Định hướng phát triển group thì sẽ theo hướng phát triển thành StartUp, bạn nào có hướng phát triển khác thì mình vẫn tôn trọng, không ép buộc gì cả
            Vì tất cả các bạn đều là sinh viên rồi, sau này cũng phải có việc làm để còn kiếm tiền, nên mình muốn các bạn tham gia nghiêm túc, xây dựng Group phát triển, kiếm tí fame thì mới có thể kiếm tiền được
          </Typography>
          <Typography paragraph variant="h5">
          Xây dựng Web cho team, cái này trước mắt chỉ cần làm dạng blog, có thể dùng các framework có sẵn hoặc tự code. Lead phần này mình giao cho Tuấn Khang vì có kinh nghiệm Dev Web, ai join có thể liên hệ bạn này. Mô tả sơ bộ thì cần các chức năng:
            Home
            Blog
            About Us
            Contact
            Login
            Phân chia role
          </Typography>
          <Typography variant="h5">
          Về các task đã và đang làm thì cứ tiếp tục hoàn thành, các bạn nào đã hiểu các kỹ thuật cơ bản có thể hợp tác làm nhóm để làm cái project lớn. Khuyến khích làm task theo dạng Series
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}