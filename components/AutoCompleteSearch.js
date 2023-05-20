import React, { memo, useCallback, useState } from 'react'
import { Text,View } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { getTaxonomic } from '../services/EggsService'
import { capitalize } from '../utils/Utils'
import { TextInput } from 'react-native-paper'

export const AutoCompleteSearch = memo((props) => {
  const [loading, setLoading] = useState(false)
  const [remoteDataSet, setRemoteDataSet] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const getSuggestions = useCallback(async query => {
    // const filterToken = q.toLowerCase()
    // console.log('getSuggestions', filterToken)
    // if (typeof q !== 'string' || q.length < 3) {
    //   setRemoteDataSet(null)
    //   return
    // }

    // const response = await fetch('https://jsonplaceholder.typicode.com/posts').then((data) => new Promise(res => {
    //   setTimeout(() => res(data), 2000)
    // }))
    // const items = await response.json()


    let search = query.toLowerCase();
    if (typeof query !== 'string' || query.length < 3) {
      setRemoteDataSet(null)
      return
    }
    setLoading(true)
    getTaxonomic({ search }).then((res) => {
      let data = res?.data.map((item) => {
        // const commonName = <Text style={{fontSize:18}}>{capitalize(item.common_name)}</Text>
        // const fontView = <Text style={{fontStyle:"italic"}}>{item.scientific_name}</Text>
        return {
          id: item.tsn,
          // title: item.common_name,
          title: capitalize(item.common_name) + " (" + item.scientific_name + ")",
          // title: <Text>{commonName} ({fontView})</Text>
          
        };
      })
      // const suggestions = data
      //   .filter(item => item.title.toLowerCase().includes(search))
      //   .map(item => ({
      //     id: item.id,
      //     title: item.title,
      //   }))
      setRemoteDataSet(data)
      setLoading(false)
    })
  }, [])

  const setValue = (item) => {
    // console.log({item});
    setSelectedItem(item);
    props.onPress(item);
  }
  const onClear = () => {
    setSelectedItem(null);
    setRemoteDataSet([])
    props.onPress(null);
  }
 

  return (
    <>
      <AutocompleteDropdown
      
        dataSet={remoteDataSet}
        closeOnBlur={false}
        useFilter={false}
        clearOnFocus={false}
        onFocus={true}
        textInputProps={{
          ref: props.refs,
          label: props.label,
          defaultValue:props.value,
          placeholder: props.placeholder,
          placeholderTextColor: '#57655d',
          // style:{borderWidth:1,borderColor:"red"}
        }}
        
        onSelectItem={setValue}
        onClear={onClear}
        loading={loading}
        onChangeText={getSuggestions}
        suggestionsListTextStyle={{
          color: '#1F515B'
        }}
        debounce={1000}
        // inputHeight={50}
        EmptyResultComponent={<Text style={{ padding: 10, fontSize: 15 }}>No result found !!!</Text>}
      />
      {props.isError ? <Text style={{ color: "red", fontSize: 13 }}>{props.errors}</Text> : null}
    </>
  )
})
