import { ShoppingCart} from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
interface Props{
    darkMode : boolean;
    handleThemeChange : () => void;
}

const midLinks = [
{title : 'catalog',path : '/catalog'},
{title : 'about',path : '/aboutpage'},
{title : 'contact',path : '/contactpage'}];

const rightLinks = [
    {title : 'login',path : '/login'},
    {title : 'register',path : '/register'}];

const navStyles = { padding: "1rem",
fontWeight:"500",
color:"#fff",
textDecoration:"none",
"&:hover":{color :"grey.500"},
"&.active":{color :"text.secondary"}
}

export default function Header({darkMode,handleThemeChange}:Props){
   return (
   <>
    <AppBar position="static" sx={{mb:4}}>
      <Toolbar sx={{display : "flex",justifyContent : "space-between",alignItems:"center"}}>
      <Box sx={{display : "flex",alignItems:"center"}}>
      <Typography
         variant="h6" 
         component={NavLink} 
         to="/"
         sx ={navStyles}>
        Pramod Ecom
        </Typography>
       <Switch checked={darkMode} onChange={handleThemeChange}/>
      </Box>
       <div style={{ display: "flex" }}>
      <List sx={{display:"flex"}}>
        {midLinks.map((midLink) => (
          <ListItem
            sx={navStyles}
            component={NavLink}
            to={midLink.path}
            key={midLink.path}
          >
            {midLink.title}
          </ListItem>
        ))}
      </List>
    </div>
  <Box sx={{display : "flex",alignItems:"center"}}>
  <IconButton size="large" sx={{color:'#fff'}}>
<Badge badgeContent={4} color="secondary">
<ShoppingCart/>
</Badge>
    </IconButton>
       <div style={{ display: "flex" }}>
       <List sx={{display:"flex"}}>
        {rightLinks.map((rightLink) => (
          <ListItem
            sx={navStyles}
            component={NavLink}
            to={rightLink.path}
            key={rightLink.path}
          >
            {rightLink.title}
          </ListItem>
        ))}
      </List>
    </div>
  </Box>
       </Toolbar>
    </AppBar>
    </>
    )
}