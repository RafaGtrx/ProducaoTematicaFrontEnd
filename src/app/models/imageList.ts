export interface imageList{
    Id: number
    ImagePath: string
    DescricaoImagem: string
    DataCriacao: string
    DataAlteracao: string
    Ativa: boolean
    ExisteComentario:boolean
    idImagem:string
    IdImagem:string
    IdUsuario: number
    NomeUsuarioComentario: string;
    showComments:any
    comments:any
    comentarios:any
    Comentario:any
    imagem:any
    Usuario: {
      Id: number;
      Nome: string;
      Email: string;
      SenhaHash: string;
      SenhaSalt: string;
      DataCriacao: string;
      Ativo: boolean;
    };
    NomeUsuario: string;
    ImageFile: any; // Altere isso para o tipo correto, se aplicável
    formattedCreationDate: string; // Se você planeja adicionar isso durante o mapeamento
    showFullDescription: boolean; // Adicione esta propriedade
  }
