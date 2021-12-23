import React from "react";
import { connect } from "frontity";
import { MenuLink } from './styles'


const MenuItemDepl = ({state, name, link }) => { 
    const indSubmenu =  String(name).indexOf(":");
    const mainName = (indSubmenu==-1?name:String(name).substring(0,indSubmenu));
    const subBloc = (indSubmenu==-1?"":String(name).substring(indSubmenu+1));
    const subNames =(indSubmenu==-1?"":String(subBloc).split(';'));
    const subLinks =(indSubmenu==-1?"":String(link).split(';'));
    //console.log('test'+mainName +' subNames '+subNames +' sublinks '+subLinks );
    return (
        <MenuLink
        key={mainName}
        link={link}
        aria-current={state.router.link === link ? "page" : undefined}
      >{mainName}</MenuLink>
    )
}


export default connect(MenuItemDepl);