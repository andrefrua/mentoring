// /**
//  * A função `createPrivateChannel()` retorna
//  * um objecto, do tipo `PrivateChannel`.
//  * Cada vez que é chamada, a função retorna um novo
//  * canal, de frequência privada, inviolável.
//  *
//  * Os objectos do tipo `PrivateChannel` têm
//  * um método apenas:
//  *
//  * - createWalkieTalkie(owner: string) : WalkieTalkie
//  *   Sempre que chamado cria uma nova instância de
//  *   `WalkieTalkie`, que permite falar no canal privado.
//  *
//  * Os objectos do tipo `WalkieTalkie` têm
//  * dois métodos apenas:
//  *
//  * - say(message: string) -> WalkieTalkie
//  *   Estabelece a mensagem corrente no canal.
//  *
//  * - listen() -> ?({sender: string, message: string})
//  *   Obtém a mensagem corrente no canal de
//  *   frequência privada (null, se não existir).
//  *
//  * Não pode ser possível aceder à mensagem do canal
//  * acedendo a propriedades das instâncias `PrivateChannel`
//  * ou `WalkieTalkie`, pelo que o paradigma para
//  * a detenção de estado tem de ser o das _closures_
//  * e respectivas variáveis locais, e não,
//  * por exemplo, `this.state`.
//  */


var createPrivateChannel = function () {
  //Private variables and methods can be set here. They will only be accessible inside this closure
  var channelMessage = null;
  return {
    createWalkieTalkie: function (newUser) {
      var user = newUser;
      // Private variables for the WalkieTalkie
      return {
        say: function (newMessage) {
          channelMessage = {
            sender: user,
            message: newMessage
          }
        },

        listen: function () {
          alert(JSON.stringify(channelMessage));
        }

      }
    }
  }
}

// Testing:

var channelA = createPrivateChannel(); // DONE

var wtDuarte = channelA.createWalkieTalkie("Duarte"); // DONE

wtDuarte.listen(); // retorna null // DONE

wtDuarte.say("Olá"); // retorna wtDuarte // Não estou a retornar nada, apenas coloco o olá na messagem do canal

var wtAndré = channelA.createWalkieTalkie("André"); // DONE

wtAndré.listen(); // retorna {sender: "Duarte", message: "Olá"} // DONE

wtAndré.listen(); // retorna o mesmo. // DONE

wtAndré.say("Estás bom?"); // DONE

wtAndré.listen(); // retorna {sender: "André", message: "Estás bom?"} //DONE

wtDuarte.listen(); // retorna {sender: "André", message: "Estás bom?"} //DONE
