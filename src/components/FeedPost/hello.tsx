{/* Footer */}
<View style={styles.footer}>
  <View style={styles.iconContainer}>
    <Pressable onPress={likePress}>
      <AntDesign
        name={isLiked ? 'heart' : 'hearto'}
        size={24}
        style={styles.icon}
        color={isLiked ? colors.accent : colors.black}
      />
    </Pressable>
    <Ionicons
      name="chatbubble-outline"
      size={24}
      style={styles.icon}
      color={colors.black}
    />
    <Feather name="send" size={24} style={styles.icon} color={colors.black} />
    <Feather
      name="bookmark"
      size={24}
      style={{ marginLeft: 'auto' }}
      color={colors.black}
    />
  </View>

  {/* Likes*/}
  <Text style={styles.text}>
    Linked by {''}
    <Text style={styles.bold}>Michel</Text>
    <Text style={styles.bold}>
      {' '}
      {''}and {post.nofLikes}
    </Text>{' '}
    others
  </Text>

  {/* Post Comments*/}
  <Text>View all {post.nofComments} comments</Text>
  {(post.Comments?.items || []).map(
    (comment) => comment && <Comment key={comment.id} comment={comment} />
  )}
  <Text>{post.createdAt}</Text>
</View>