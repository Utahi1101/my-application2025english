import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, FlatList, Image, Switch, StyleSheet } from 'react-native';

const sampleVocab = [
  {
    word: 'apple',
    part_of_speech: 'noun',
    genre: 'food',
    level: 'easy',
    related: ['fruit', 'red', 'sweet'],
    synonyms: ['fruit'],
    proper_noun: false,
    image_url: 'https://via.placeholder.com/150'
  },
  {
    word: 'Einstein',
    part_of_speech: 'proper noun',
    genre: 'person',
    level: 'advanced',
    related: ['physics', 'genius'],
    synonyms: [],
    proper_noun: true,
    image_url: 'https://via.placeholder.com/150'
  }
];

export default function App() {
  const [word, setWord] = useState(null);
  const [history, setHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [showProperNouns, setShowProperNouns] = useState(true);
  const [counts, setCounts] = useState({});

  const getRandomWord = () => {
    const filtered = showProperNouns ? sampleVocab : sampleVocab.filter(w => !w.proper_noun);
    const selected = filtered[Math.floor(Math.random() * filtered.length)];
    setWord(selected);
    setHistory([selected, ...history]);
    setCounts(prev => ({ ...prev, [selected.word]: (prev[selected.word] || 0) + 1 }));
  };

  const toggleBookmark = () => {
    if (word && !bookmarks.find(b => b.word === word.word)) {
      setBookmarks([...bookmarks, word]);
    }
  };

  const renderWordDetail = (item) => (
    <View style={styles.card}>
      <Text style={styles.word}>{item.word}</Text>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text>品詞: {item.part_of_speech}</Text>
      <Text>ジャンル: {item.genre}, レベル: {item.level}</Text>
      <Text>関連語: {item.related.join(', ')}</Text>
      <Text>類義語: {item.synonyms.join(', ')}</Text>
      <Text>出力回数: {counts[item.word] || 0}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>英単語学習アプリ</Text>
      <View style={styles.row}>
        <Button title="単語を出力" onPress={getRandomWord} />
        <Switch value={showProperNouns} onValueChange={setShowProperNouns} />
        <Text>固有名詞を含む</Text>
      </View>
      {word && renderWordDetail(word)}
      <Button title="ブックマーク" onPress={toggleBookmark} />
      <Text style={styles.subtitle}>ブックマーク一覧</Text>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.word}
        renderItem={({ item }) => renderWordDetail(item)}
      />
      <Text style={styles.subtitle}>履歴</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => item.word + index}
        renderItem={({ item }) => renderWordDetail(item)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginVertical: 6
  },
  word: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 6
  }
});
