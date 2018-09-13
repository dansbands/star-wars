import React from 'react'
import characters from '../utils/characters.json'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class PersonPicker extends React.Component {
  state = {
    characters: [],
    dropdownOpen: false
  }

  componentDidMount() {
    this.setState({ characters: characters.characters })
  }

  toggle = () => {
   this.setState(prevState => ({
     dropdownOpen: !prevState.dropdownOpen
   }));
 }

 renderDropdownItems = () => {
   let newChar = this.state.characters.map(ch => {
     return <DropdownItem value={ch.url}>{ch.name}</DropdownItem>
   })
   return newChar
 }

  render () {
    console.log('PersonPicker characters', this.state.characters);
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Choose a Character
        </DropdownToggle>
        <DropdownMenu>
          {this.renderDropdownItems()}
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default PersonPicker;
