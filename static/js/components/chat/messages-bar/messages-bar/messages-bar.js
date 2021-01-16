//#Import
import MessagesBar__Footer from '../../../../components/chat/messages-bar/messages-bar__footer/messages-bar__footer.js'
import MessagesBar__Messages from '../../../../components/chat/messages-bar/messages-bar__messages/messages-bar__messages.js'
import MessagesBar__Header from '../../../../components/chat/messages-bar/messages-bar__header/messages-bar__header.js'
//#Import
import Component from '../../../../component/Component.js';
class MessagesBar extends Component {
    constructor() {
        super(...arguments);
        this.messages = [];
        this.sendMessage_onClik = (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            const input = document.getElementById('input_send-message');
            const value = input.value.trim();
            input.value = '';
            //(document.getElementById('input_send-message') as HTMLInputElement).value = ''
            if (!value) {
                return;
            }
            const lastMessage = this.messages[this.state.messages.length - 1];
            let id = 0;
            if (lastMessage) {
                id = lastMessage.id;
            }
            id++;
            const messages = this.messages;
            messages.push({ id, type: 'out', date: this.getCurrentDate(), text: value });
            this.setState({ messages });
        };
        this.state = {
            sendMessage_onClik: this.sendMessage_onClik,
            messages: this.messages
            //[
            //{id: 0, type: 'in',  date: '13:15', text: 'Putting the page number in the middle of the wording is a bad idea'}
            // {id: 1,type: 'in',  date: '22:14', text: 'It was snapped off at the handle, and the blade was splintered, like somebody used it to hit something hard.'},
            // {id: 2,type: 'out', date: '02:14', text: 'Barbie saw one of the rotors break off.'},
            // {id: 3,type: 'out', date: '17:14', text: 'The Swiss Guard chopper churned in neutral as Langdon and Vittoria approached.'},
            // {id: 4,type: 'in',  date: '20:19', text: 'Putting the page number in the middle of the wording is a bad idea,'}
            //]
        };
    }
    getCurrentDate() {
        //let res:string = `${new Date().getHours()}:${new Date().getMinutes()}`
        let hours = String(new Date().getHours());
        hours = hours.length === 1 ? '0' + hours : hours;
        let minutes = String(new Date().getMinutes());
        minutes = minutes.length === 1 ? '0' + minutes : minutes;
        return `${hours}:${minutes}`;
    }
    //#Components
components() {return {MessagesBar__Header,MessagesBar__Messages,MessagesBar__Footer}}
//#Components
template() {
        return (`<div className='messages-bar'>
        <MessagesBar__Header title={{props.title}} id={{props.id}} avatar={{props.avatar}}></MessagesBar__Header>
        <MessagesBar__Messages messages={{state.messages}}></MessagesBar__Messages> 
        <MessagesBar__Footer sendMessage_onClik={{state.sendMessage_onClik}}></MessagesBar__Footer>
      </div>`);
    }
}
export default MessagesBar;
//# sourceMappingURL=messages-bar.js.map