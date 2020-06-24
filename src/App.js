import React, { useState, useEffect } from "react";
import api from "./services/api";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(repository => setRepositories(repository.data));
  }, [])

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);
    if (response.status === 200) {
      const newRepositories = [...repositories];
      const index = newRepositories.findIndex(repo => repo.id === id);
      if (index >= 0) {
        newRepositories[index] = response.data;
        setRepositories(newRepositories);
      }
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Repositórios</Text>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>
    
              <View style={styles.techsContainer}>
                {
                  repository.techs.map((tech, index) => (
                    <Text key={index} style={styles.tech}>
                      {tech}
                    </Text>
                  ))
                }
              </View>
    
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}
                >
                  {`${repository.likes} curtidas`}
                </Text>
              </View>
    
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                testID={`like-button-${repository.id}`}
                activeOpacity={0.6}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  title: {
    padding: 15,
    justifyContent: "center",
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    color: 'white'
  },
  repositoryContainer: {
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 4
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "italic"
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 13,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: "#fff",
    borderRadius: 4
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#7159c1",
    padding: 15,
    borderRadius: 4
  },
});
