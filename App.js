import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,TouchableOpacity,FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';



export default function App() {
  const[nomeProduto,setNomeProduto]=useState("")
  const[precoProduto,setPrecoProduto]=useState()
  const[listaProdutos,setListaProdutos]=useState([])

  useEffect(()=>{
    buscarDados()
  },[])

  async function salvar(){
    let produtos = [] //Inicializa um array vazio...

    //Verificar se o AsyncStorage já possui dados
    if(await AsyncStorage.getItem("PRODUTOS")!==null){
      //Se houver dados, será enviado para o array produtos
      produtos = JSON.parse(await AsyncStorage.getItem("PRODUTOS"))
    }

    //Adicionar o produto no array
    produtos.push({nome:nomeProduto,preco:precoProduto})

    //Salvando os dados no Async Storage
    await AsyncStorage.setItem("PRODUTOS",JSON.stringify(produtos))

    Alert.alert("Sucesso","Produto Cadastrado com Sucesso!")

    //Limpando os TextInputs depois de salvar
    setNomeProduto("")
    setPrecoProduto("")

    buscarDados()
  }

  //Função para buscar os produtos
  async function buscarDados() {
    const produtos = await AsyncStorage.getItem("PRODUTOS")
    //console.log(produtos)
    setListaProdutos(JSON.parse(produtos))
  }

  return (
    <View style={styles.container}>
      <Text>CADASTRO DE PRODUTOS</Text>
      {/* TextInput do Nome do Produto */}
      <TextInput 
        placeholder='Digite o nome produto'
        style={styles.input}
        value={nomeProduto}
        onChangeText={(value)=>setNomeProduto(value)}
      />

      {/* TextInput do Preço do Produto */}
      <TextInput 
        placeholder='Digite o preço do produto'
        style={styles.input}
        keyboardType='numeric'
        value={precoProduto}
        onChangeText={(value)=>setPrecoProduto(value)}
      />

      {/* Botão para cadastrar os produtos */}
      <TouchableOpacity style={styles.btn} onPress={salvar}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>

      {/* Botão para buscar os dados */}
      <TouchableOpacity style={styles.btn} onPress={buscarDados}>
        <Text style={styles.buttonText}>BUSCAR DADOS</Text>
      </TouchableOpacity>

      <FlatList 
        data={listaProdutos}
        renderItem={({item})=>{
          return(
            <Text>PRODUTO:{item.nome} - PREÇO:{item.preco}</Text>
          )
        }}
      />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop:30
  },
  input:{
    borderWidth:1,
    height:50,
    width:300,
    borderRadius:15,
    marginBottom:10
  },
  btn:{
    borderWidth:1,
    height:50,
    width:300,
    borderRadius:15,
    backgroundColor:'blue',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10
  },
  buttonText:{
    color:'white'
  }
});
