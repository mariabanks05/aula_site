Regras do App — Especificação (Mobile-first)

Visão Geral
- Aplicativo móvel estilo iFood, desenvolvido com React Native (Expo).
- Público-alvo: funcionários (restaurante/estabelecimento) para gerenciar e fazer pedidos.

Plataformas
- Mobile-first: suporte inicial para Android e iOS via Expo.

Tecnologias
- Frontend: React Native com Expo.
- Backend / Banco de dados: Firebase (Authentication, Firestore, Storage).
- Pagamentos: integração com PIX (redirecionamento para QRCode/linha digitável ou uso da API de pagamentos compatível).

Usuários e Permissões
- Funcionário (usuário principal): pode se cadastrar, fazer login, visualizar cardápio, realizar pedidos e pagar via PIX.
- Papel futuro: administrador/gerente — gerenciar cardápio, status de pedidos.

Funcionalidades Principais
- Cadastro/Login: autenticação via Firebase Authentication (email/senha, e possivelmente OTP no futuro).
- Perfil do Funcionário: nome, contato, foto (opcional).
- Cardápio (pratos): listar categorias e itens com nome, descrição, preço, foto e disponibilidade.
- Visualizar pratos: detalhes do prato com botão "Adicionar ao pedido".
- Carrinho / Pedido: adicionar/remover itens, ver total, escolher quantidade.
- Pagamento: gerar instruções de pagamento PIX (código QR ou payload PIX) e marcar pedido como pago após confirmação.
- Histórico de pedidos: listagem de pedidos feitos pelo funcionário.
- Notificações (opcional): status do pedido (aceito, em preparo, pronto, entregue).

Regras de Negócio
- Apenas usuários autenticados podem fazer pedidos.
- Itens indisponíveis não aparecem para seleção.
- Ao iniciar um pagamento PIX, salvar um registro de tentativa de pagamento no Firestore para auditoria.
- Confirmar pagamento: inicialmente manual/por verificação do usuário; posteriormente integração com provedor para confirmação automática.

Modelos de Dados (simplificado)
- users/{userId}: {name, email, photoURL, role}
- pratos/{pratoId}: {nome, descricao, preco, categoria, fotoURL, disponivel}
- pedidos/{pedidoId}: {userId, items:[{pratoId, nome, preco, quantidade}], total, status, createdAt, pagamento:{method:"PIX", status, payload}}

Segurança e Regras do Firebase
- Firestore Security Rules para garantir que cada usuário só leia/escreva seus pedidos e que apenas administradores possam alterar o cardápio.

Considerações sobre PIX
- Gerar payload/instrução de pagamento no momento do checkout.
- Não armazenar dados sensíveis de pagamento; armazenar apenas o necessário para auditoria (status, timestamp, id de transação quando disponível).

Requisitos Não-Funcionais
- Mobile-first e responsivo para múltiplos tamanhos de tela.
- Offline: cache simples do cardápio para leitura quando sem conexão (opcional inicial).
- Performance: usar imagens otimizadas e paginação/limit no cardápio.

Próximos passos sugeridos
- Definir telas principais e fluxos (wireframes).
- Modelagem detalhada do Firestore e regras de segurança.
- Scaffold do projeto Expo e integração inicial com Firebase.

Observações
- Posso começar a scaffolder o projeto Expo e configurar o Firebase, se desejar.
