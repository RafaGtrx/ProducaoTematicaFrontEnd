interface Post {
    nome: string;
    dataPublicacao: string;
    descricao: string;
    imagem: string;
    comentarios: {
      idComentario: number;
      comentario: string;
      nomeComentario: string;
    }[];
    showFullDescription: boolean;
    showOptions: boolean; 
  }