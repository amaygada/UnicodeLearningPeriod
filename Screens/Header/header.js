import * as React from 'react'
import {Appbar} from 'react-native-paper'

export let Header = props => {
    return(
        <Appbar.Header style = {{backgroundColor : "#1e4f74"}}>
            <Appbar.Content title={props.title}/>
        </Appbar.Header>
    )
}