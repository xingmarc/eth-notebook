import React from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, FormControl} from 'react-bootstrap'
import '../css/Reader.css'
import '../css/markdown.css'
const Markdown = require('react-markdown');
const Web3 = require('web3');

var web3 = new Web3(Web3.givenProvider);
if(!web3.currentProvider) {
  web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/zlPxlGZa5NUkLUBHtUVl'));
}

class Reader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    }
  }
  componentWillReceiveProps(newProps) {
    web3.eth.getTransaction(newProps.match.params.txid, (err,transaction) => {
      console.log(transaction);
      if(!transaction){
        this.setState({content: 'No transaction found'});
        return;
      }
      var hex  = transaction.input.toString();
      let str = decodeURIComponent(hex.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'));
      this.setState({content: str});
    });
  }
  componentWillMount() {
    var hex='000a00230020004500540048002d006e006f007400650062006f006f006b000a000a0050007500740020007700680061007400200079006f0075002000770061006e007400200074006f00200073006800610072006500200069006e0074006f0020007400680065002000740065007800740062006f00780020006f006e00200074006800650020006c00650066007400200061006e00640020006300680061006e0067006500730020006100720065000a006100750074006f006d00610074006900630061006c006c0079002000720065006e0064006500720065006400200061007300200079006f007500200074007900700065002e000a000a002a0020004d00610072006b0064006f0077006e0020006c0061006e0067007500610067006500200073007500700070006f007200740065006400200061006e00640020007200650063006f006d006d0065006e006400650064000a002a00200049006d0070006c0065006d0065006e007400730020005b00470069007400480075006200200046006c00610076006f0072006500640020004d00610072006b0064006f0077006e005d002800680074007400700073003a002f002f006700690074006800750062002e006700690074006800750062002e0063006f006d002f00670066006d002f0029000a002a00200049006600200079006f007500200065007300630061007000650020006f007200200073006b006900700020007400680065002000480054004d004c002c0020006e006f0020006000640061006e006700650072006f00750073006c00790053006500740049006e006e0065007200480054004d004c006000200069007300200075007300650064002100200059006100790021000a000a0023002300200043006f006400650062006c006f0063006b003f000a000a006000600060000a006400650066002000680065006c006c006f0057006f0072006c006400280029003a000a00200020007000720069006e00740028002200480065006c006c006f00200057006f0072006c0064002100220029000a006000600060000a000a002300230020005400610062006c00650073003f000a000a007c002000460065006100740075007200650020007c00200053007500700070006f007200740020007c000a007c0020002d002d002d002d002d002d0020007c0020002d002d002d002d002d002d002d002d002d002d002d0020007c000a007c0020007400610062006c006500730020007c002027140020007c000a007c00200061006c00690067006e006d0065006e00740020007c002027140020007c000a007c002000770065007700740020007c002027140020007c000a000a';
      let str = decodeURIComponent(hex.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'));
    this.setState({content: str});
    // web3.eth.getTransaction(this.props.match.params.txid, (err,transaction) => {
    //   if(!transaction){
    //     this.setState({content: 'No transaction found'});
    //     return;
    //   }
    //   var hex  = transaction.input.toString();
    //   let str = decodeURIComponent(hex.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'));
    //   this.setState({content: str});
    // });
  }

  render() {
    console.log(this.state.content);
    return (
      <div>
        <Markdown
          className="reader"
          source={this.state.content}
        />
      </div>
    );
  }
}
export default Reader;
